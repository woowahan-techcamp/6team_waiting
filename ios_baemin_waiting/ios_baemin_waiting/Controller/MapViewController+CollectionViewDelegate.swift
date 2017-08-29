//
//  MapViewController+CollectionViewDelegate.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 22..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

// MARK: UICollectionViewDataSource
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

// MARK: UICollectionViewDelegate
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
                    for item in visibleItemIndexPath where item.row > max.row {
                        max = item
                    }
                    indexPath = max
                }
            } else {
                // 뒤로. 작은 쪽 선택
                if var min = visibleItemIndexPath.first {
                    for item in visibleItemIndexPath where item.row < min.row {
                        min = item
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

// MARK: UICollectionViewFlowLayout
class MapCollectionViewFlowLayout: UICollectionViewFlowLayout {

    override func targetContentOffset(forProposedContentOffset proposedContentOffset: CGPoint, withScrollingVelocity velocity: CGPoint) -> CGPoint {

        if let cv = self.collectionView {

            let cvBounds = cv.bounds
            let halfWidth = cvBounds.size.width * 0.5
            let proposedContentOffsetCenterX = proposedContentOffset.x + halfWidth + 5

            if let attributesForVisibleCells = self.layoutAttributesForElements(in: cvBounds) {

                var candidateAttributes: UICollectionViewLayoutAttributes?
                for attributes in attributesForVisibleCells {

                    // == Skip comparison with non-cell items (headers and footers) == //
                    if attributes.representedElementCategory != UICollectionElementCategory.cell {
                        continue
                    }

                    if let candAttrs = candidateAttributes {

                        let a = attributes.center.x - proposedContentOffsetCenterX
                        let b = candAttrs.center.x - proposedContentOffsetCenterX

                        if fabsf(Float(a)) < fabsf(Float(b)) {
                            candidateAttributes = attributes
                        }

                    } else { // == First time in the loop == //

                        candidateAttributes = attributes
                        continue
                    }

                }

                return CGPoint(x : candidateAttributes!.center.x - halfWidth, y : proposedContentOffset.y)
            }
        }
        
        // Fallback
        return super.targetContentOffset(forProposedContentOffset: proposedContentOffset)
    }
    
}

