//
//  MapViewController+CollectionViewDataSource.swift
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

    //    func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
//
////        print(targetContentOffset.pointee.x)
//
//        let space = 10.0
//
//        let swipeLengthX = scrollView.contentOffset.x
//        let itemCount = mapCollectionView.numberOfItems(inSection: 0)
//
//        if swipeLengthX > view.frame.width * 0.6 {
//            let itemIndex = Int((swipeLengthX / view.frame.width).rounded())
//            let indexPath = IndexPath(item: itemIndex, section: 0)
//
//            if itemIndex <= itemCount {
//
//                self.mapCollectionView.setContentOffset(CGPoint(x: 20, y: 0), animated: true)
////                self.mapCollectionView.contentOffset.x = 30
////                self.mapCollectionView.scrollToItem(at: indexPath, at: .centeredHorizontally, animated: true)
////                self.mapCollectionView.selectItem(at: indexPath, animated: true, scrollPosition: .centeredHorizontally)
//            }
//
//            print("itemIndex : \(itemIndex)")
//
//        }
//
////        let collectionViewWidth = self.mapCollectionView.bounds.width
////
////        let minSpace = CGFloat(30.0)
////
////        var cellToSwipe = (targetContentOffset.pointee.x)/(collectionViewWidth + minSpace)
////
////        if cellToSwipe < 0 {
////            cellToSwipe = 0
////        } else {
////            cellToSwipe = CGFloat(mapCollectionView.numberOfItems(inSection: 0) - 2)
////        }
////        let indexPath = IndexPath(item: Int(cellToSwipe), section: 0)
////
////        let index = targetContentOffset.pointee.x / view.frame.width
////        let indexPath = IndexPath(item: Int(index), section: 0)
////
////        self.mapCollectionView.selectItem(at: indexPath, animated: true, scrollPosition: .right)
//    }
}

extension MapViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: self.view.bounds.width - 32, height: 120)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 0
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 10
    }
}
