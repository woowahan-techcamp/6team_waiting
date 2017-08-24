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

    func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
        print(targetContentOffset.pointee.x)

        let index = targetContentOffset.pointee.x / (self.view.bounds.width - 64 - 10)

        print(index)

        if let overlay = overlayItems {
            overlay.selectPOIitem(at: Int32(index), moveToCenter: true)
        }
    }

}
