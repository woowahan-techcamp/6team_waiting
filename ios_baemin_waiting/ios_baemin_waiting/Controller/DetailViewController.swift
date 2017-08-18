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

    @IBOutlet weak var tableView: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.tableView.dataSource = self
        self.tableView.delegate = self

        ServerRepository.getStoreDetail(detailStoreId: storeId) { detailStoreData in
            self.detailStore = detailStoreData

            self.tableView.reloadData()
        }
    }
}

extension DetailViewController : UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 6
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
            if let callStoreCell = tableView.dequeueReusableCell(withIdentifier: "storeCallButtonCell") as? StoreCallButtonCell {
                cell = callStoreCell
            }
        case 3:
            if let mapViewCell = tableView.dequeueReusableCell(withIdentifier: "storeMapViewCell") as? StoreMapViewCell {
                mapViewCell.putMap(store: detailStore)
                cell = mapViewCell
            }
        case 4:
            if let lineShowCell = tableView.dequeueReusableCell(withIdentifier: "storeLineShowCell") as? StoreLineShowCell {
                lineShowCell.putlineNumber(lineNumber: detailStore.currentInLine)
                cell = lineShowCell
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
            cellHeight = 130
        case 2:
            cellHeight = 50
        case 3:
            cellHeight = 85
        case 4:
            cellHeight = 70
        default:
            cellHeight = 150
        }
        return cellHeight
    }
}
