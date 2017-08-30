//
//  StoreListManager.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 29..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

class StoreListManager: NSObject {

    var rawStoreList: [Store] = []
    var storeList: [[Store]] = []
    var openStoreList: [Store] = []
    var closeStoreList: [Store] = []

    override init() {
    }
}

// MARK: CLLocationManagerDelegate
extension StoreListManager: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {

        print("StoreList: CLLocation Manager Update Error")

        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "locationManagerFail"),
                                        object: nil, userInfo: ["error": error])
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let currentLocation = locations.last else { return }

        print("StoreList: Location Update Called")

        ServerRepository.postCurrentLocation(currentLocation: currentLocation) { isSuccess, storeData in

            if isSuccess {
                self.rawStoreList = storeData
                self.openStoreList = []
                self.closeStoreList = []
                self.storeList = []
                print("Location Update Success")

                if self.rawStoreList.count > 0 {

                    self.rawStoreList = self.rawStoreList.sorted { (store1: Store, store2: Store) -> Bool in
                        return store1.storeDistance < store2.storeDistance
                    }

                    for store in self.rawStoreList {
                        if store.storeIsOpened {
                            self.openStoreList.append(store)
                        } else {
                            self.closeStoreList.append(store)
                        }
                    }
                    self.storeList.append(self.openStoreList)
                    self.storeList.append(self.closeStoreList)

                    NotificationCenter.default.post(name: NSNotification.Name(rawValue: "storeListDataUpdate"),
                                                    object: nil, userInfo: ["storeData": self.storeList])
                    NotificationCenter.default.post(name: NSNotification.Name(rawValue: "storeListMapDataUpdate"),
                                                    object: nil, userInfo: ["storeData": self.rawStoreList])

                } else {
                    // 검색 결과가 없는 경우
                    NotificationCenter.default.post(name: NSNotification.Name(rawValue: "storeListDataNoResult"),
                                                    object: nil, userInfo: nil)
                }
            } else {
                // 서버에서 정보를 받아 올 수 없는 경우
                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "storeListDataServerError"),
                                                object: nil, userInfo: nil)
            }
        }
        // 마무리
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "endRefreshControl"),
                                        object: nil, userInfo: nil)

    }
}
