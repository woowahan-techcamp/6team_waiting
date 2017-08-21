//
//  MainCollectionViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 9..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MainCollectionViewController: UIViewController {

    let locationManager = CLLocationManager()
    var storeList: [Store] = []
    let refresh = UIRefreshControl()

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

        locationManager.delegate = self

        locationManager.startUpdatingLocation()

        refresh.addTarget(self, action: #selector(refreshData), for: .valueChanged)
        collectionView.addSubview(refresh)

        snackbarAnimation()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()

    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "mainSegue" {
            if let indexPath = collectionView.indexPathsForSelectedItems {
                let storeId = storeList[indexPath[0].item].storeId
                if let detailViewController = segue.destination as? DetailViewController {
                    detailViewController.storeId = storeId
                    detailViewController.navigationItem.leftBarButtonItem = splitViewController?.displayModeButtonItem
                    detailViewController.navigationItem.leftItemsSupplementBackButton = true
                }
            }
        }
    }

    func snackbarAnimation() {

        UIView.animate(withDuration: 1.0, delay: 1.5, options: .transitionCrossDissolve, animations: {
            self.snackbarView.alpha = 0
        }, completion: { finished in
            if finished {
                self.snackbarView.removeFromSuperview()
            }
        })
    }

    func refreshData() {
        locationManager.delegate = self
        locationManager.startUpdatingLocation()
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

extension MainCollectionViewController: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        self.locationManager.stopUpdatingLocation()
        self.locationManager.delegate = nil
        print("CLLocation Manager Update Error")

    }
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let currentLocation = locations.last else { return }

        ServerRepository.postCurrentLocation(currentLocation: currentLocation) { storeData in
            self.storeList = storeData

            self.storeList = self.storeList.sorted { (store1: Store, store2: Store) -> Bool in
                return store1.storeDistance < store2.storeDistance
            }

            self.collectionView.reloadData()
        }

        refresh.endRefreshing()
        locationManager.stopUpdatingLocation()
        locationManager.delegate = nil
    }
}
