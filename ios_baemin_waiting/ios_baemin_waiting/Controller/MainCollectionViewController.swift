//
//  MainCollectionViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 9..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MainCollectionViewController: UIViewController {

    let jsonController = JsonController()
    var storeList: [Store] = []

    // IBOutlet
    @IBOutlet weak var snackbarView: UIView!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!

    override func viewDidLoad() {
        super.viewDidLoad()

        collectionView.dataSource = self
        collectionView.delegate = self

        activityIndicator.startAnimating()
        collectionView.isHidden = true

        ServerRepository.getStoreList { storeData in
            self.storeList = storeData
            self.collectionView.reloadData()
        }

        snackbarAnimation()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()

    }

    func snackbarAnimation() {

        UIView.animate(withDuration: 1.0, delay: 1.5, options: .transitionCrossDissolve, animations: {
            self.snackbarView.alpha = 0
        }, completion: { finished in
            self.snackbarView.removeFromSuperview()
        })
    }
}

// MARK: UICollectionViewDataSource
extension MainCollectionViewController: UICollectionViewDataSource {
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        if let sectionHeaderView = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "SectionHeader", for: indexPath) as? MainCollectionReusableView {

            return sectionHeaderView
        }

        return UICollectionReusableView()
    }

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return storeList.count
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cellId", for: indexPath) as? MainCollectionViewCell {
            cell.putCellContent(storeInfo: storeList[indexPath.row])
            return cell
        }

        return UICollectionViewCell()
    }
}

extension MainCollectionViewController: UICollectionViewDelegateFlowLayout {

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: (self.view.bounds.width / 2) - (15 + 7.5), height: 185)
    }

}

extension MainCollectionViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, willDisplay cell: UICollectionViewCell, forItemAt indexPath: IndexPath) {
        if indexPath.row == collectionView.indexPathsForVisibleItems.last?.count {
            activityIndicator.stopAnimating()
            collectionView.isHidden = false
        }
    }
}
