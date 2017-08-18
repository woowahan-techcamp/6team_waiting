//
//  StoreDescriptionCell.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 11..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class StoreDescriptionCell: UITableViewCell {

    @IBOutlet weak var storeNameLabel: UILabel!
    @IBOutlet weak var storeDescriptionLabel: UILabel!
    @IBOutlet weak var storeDescriptionContents: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    func putStoreDescrition(storeName: String, storeDescription: String) {
        storeNameLabel.text = storeName
        storeDescriptionContents.text = storeDescription
    }
}
