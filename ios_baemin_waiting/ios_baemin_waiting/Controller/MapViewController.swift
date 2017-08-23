//
//  ViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 4..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MapViewController: UIViewController {

    enum State {
        case disabled
        case tracking
    }

    @IBOutlet weak var mapCollectionView: UICollectionView!

    var mapView: NMapView?
    var myLocation: NGeoPoint?
    var circleArea: NMapCircleData?
    var markers: [NMapPOIitem] = []
    var storeList: [Store] = []

    private var currentState: State = .disabled

    override func viewDidLoad() {
        super.viewDidLoad()

        NotificationCenter.default.addObserver(self, selector: #selector(dataUpdated),
                                               name: NSNotification.Name(rawValue: "dataUpdate"), object: nil)

        mapView = initMap(frame: self.view.bounds)

        if let mapView = mapView {
            mapView.delegate = self
            mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            view.addSubview(mapView)
        }

        switch currentState {
        case .disabled:
            enableLocationUpdate()
            currentState = .tracking
        default:
            disableLocationUpdate()
            currentState = .disabled
        }

        view.addSubview(mapCollectionView)

        mapCollectionView.register(UINib(nibName: "MainMapCollectionViewCell", bundle: nil), forCellWithReuseIdentifier: "MainMapCollectionViewCell")

    }

    // NotificationCenter 메소드
    func dataUpdated(_ notification: NSNotification) {
        guard let storeListData = notification.userInfo?["storeData"] as? [Store] else {
            print("Error: Data not Passed")
            return
        }

        getStoreForCollectionView(storeListData: storeListData) {
            self.storeList = self.storeList.sorted { (store1: Store, store2: Store) -> Bool in
                return store1.storeDistance < store2.storeDistance
            }
            DispatchQueue.main.async {
                self.mapCollectionView.reloadData()
            }
        }

    }

    func getStoreForCollectionView(storeListData: [Store], completion: @escaping () -> Void) {
        self.storeList = storeListData

        completion()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        mapView?.viewDidAppear()
    }
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        mapView?.viewWillDisappear()
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        if let location = myLocation {
            mapView?.setMapCenter(location, atLevel: 9)
        }

        mapView?.viewWillAppear()
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
