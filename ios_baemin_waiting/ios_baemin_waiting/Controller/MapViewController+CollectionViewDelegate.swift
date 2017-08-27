//
//  MapViewController+CollectionViewDelegate.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 22..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

extension MapViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.storeList.count
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if let cell =  collectionView.dequeueReusableCell(withReuseIdentifier: "MainMapCollectionViewCell", for: indexPath) as? MainMapCollectionViewCell {
            cell.putCellContent(storeInfo: self.storeList[indexPath.row])

            return cell
        }

        return UICollectionViewCell()
    }
}

extension MapViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        performSegue(withIdentifier: "mapToDetail", sender: storeList[indexPath.item])
    }
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "mapToDetail" {
            if let destination = segue.destination as? DetailViewController {
                if let store = sender as? Store {
                    let storeId = store.storeId

                    destination.storeId = storeId
                }
            }
        }
    }
    func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
        prevOffset = scrollView.contentOffset

        if let overlay = overlayItems {
            overlay.deselctFocusedPOIitem()
        }
    }

    func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {

        let currentOffset = targetContentOffset.pointee
        let visibleItemIndexPath = mapCollectionView.indexPathsForVisibleItems
        var indexPath: IndexPath?

        if let prev = prevOffset {
            if prev.x < currentOffset.x {
                // 앞으로, 큰 쪽 선택
                if var max = visibleItemIndexPath.first {
                    for item in visibleItemIndexPath {
                        if item.row > max.row {
                            max = item
                        }
                    }
                    indexPath = max
                }
            } else {
                // 뒤로. 작은 쪽 선택
                if var min = visibleItemIndexPath.first {
                    for item in visibleItemIndexPath {
                        if item.row < min.row {
                            min = item
                        }
                    }
                    indexPath = min
                }
            }
        }

        if let idxPath = indexPath {
            if let overlay = overlayItems {
                overlay.selectPOIitem(at: Int32(idxPath.row), moveToCenter: true)
            }
        }
    }
}
