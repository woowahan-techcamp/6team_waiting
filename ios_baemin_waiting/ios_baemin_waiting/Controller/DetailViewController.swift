//
//  DetailViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 11..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {

    var detailStore: Store = Store()
    var storeId: Int = 0
    var mapIndexPath: IndexPath?
    var storeLocation: NGeoPoint?

    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var lineButtion: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.tableView.dataSource = self
        self.tableView.delegate = self

        ServerRepository.getStoreDetail(detailStoreId: storeId) { detailStoreData in
            self.detailStore = detailStoreData

            switch self.detailStore.storeIsOpened {
            case false:
                self.lineButtion.isEnabled = false
                self.lineButtion.backgroundColor = UIColor.lightGray
                self.lineButtion.setTitle("오픈 준비중 입니다.", for: .normal)
            default:
                self.lineButtion.isEnabled = true
            }

            if let indexPath = self.mapIndexPath {
                if let cell = self.tableView.cellForRow(at: indexPath) as? StoreMapViewCell {

                    let gesture = UITapGestureRecognizer(target: self, action: #selector(self.mapTapped))

                    cell.currentMapView?.addGestureRecognizer(gesture)
                    cell.setMap(store: self.detailStore)

                }
            }
            self.tableView.reloadData()
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        if let indexPath = self.mapIndexPath {
            if let cell = self.tableView.cellForRow(at: indexPath) as? StoreMapViewCell {

                if let location = storeLocation {
                    cell.currentMapView?.setMapCenter(location)
                }

                cell.currentMapView?.viewWillAppear()
            }
        }
    }
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)

        if let indexPath = self.mapIndexPath {
            if let cell = self.tableView.cellForRow(at: indexPath) as? StoreMapViewCell {

                cell.currentMapView?.viewDidDisappear()
            }
        }

    }
}

extension DetailViewController : UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 5
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        var cell = UITableViewCell()

        switch indexPath.row {
        case 0:
            if let imageCell = tableView.dequeueReusableCell(withIdentifier: "storeImageCell") as? StoreImageCell {
                if let img = detailStore.storeImgUrl {
                    imageCell.putStoreImage(storeImgUrl: img)
                }
                cell = imageCell
            }
        case 1:
            if let descriptionCell = tableView.dequeueReusableCell(withIdentifier: "storeDesciptionCell") as? StoreDescriptionCell {
                descriptionCell.putStoreDescrition(storeName: detailStore.storeName, storeDescription: detailStore.storeDescription)
                cell = descriptionCell
            }
        case 2:
            if let lineShowCell = tableView.dequeueReusableCell(withIdentifier: "storeLineShowCell") as? StoreLineShowCell {
                lineShowCell.putlineNumber(lineNumber: detailStore.currentInLine)
                cell = lineShowCell
            }

        case 3:
            if let callStoreCell = tableView.dequeueReusableCell(withIdentifier: "storeCallButtonCell") as? StoreCallButtonCell {
                callStoreCell.putStoreTel(storeTel: detailStore.storeTel)
                cell = callStoreCell
            }
        case 4:
            if let mapViewCell = tableView.dequeueReusableCell(withIdentifier: "storeMapViewCell") as? StoreMapViewCell {
                mapIndexPath = indexPath
                cell = mapViewCell
            }
        default:
            cell = UITableViewCell()
        }

        return cell
    }

}

extension DetailViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        var cellHeight = CGFloat()

        switch indexPath.row {
        case 0:
            cellHeight = 200
        case 1:
            cellHeight = 136
        case 2:
            cellHeight = 75
        case 3:
            cellHeight = 65
        case 4:
            cellHeight = 160
        default:
            cellHeight = 150
        }
        return cellHeight
    }

    func mapTapped() {
        if let lat = CLLocationDegrees(detailStore.storeLatitude),
            let long = CLLocationDegrees(detailStore.storeLongitude) {

            let location = NGeoPoint(longitude: long, latitude: lat)
            performSegue(withIdentifier: "showDetailMap", sender: location)
        }
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showDetailMap" {
            if let destination = segue.destination as? DetailMapViewController {
                if let location = sender as? NGeoPoint {
                    destination.location = location
                }
            }
        } else if segue.identifier == "Waiting" {
            if let waitingTicketViewController = segue.destination as? WaitingTicketViewController {
                waitingTicketViewController.storeId = self.storeId
            }
        }

    }
}
