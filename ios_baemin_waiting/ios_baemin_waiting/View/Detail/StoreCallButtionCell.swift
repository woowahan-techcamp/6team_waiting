//
//  StoreCallButtionCell.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 11..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class StoreCallButtonCell: UITableViewCell {
    var tel: String = ""

    @IBAction func storeCallButton(_ sender: Any) {
        if let url = URL(string: "tel://\(tel)"), UIApplication.shared.canOpenURL(url) {
            if #available(iOS 10, *) {
                UIApplication.shared.open(url)
            } else {
                UIApplication.shared.openURL(url)
            }
        }
    }

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    func putStoreTel(storeTel: String) {
        tel = storeTel
    }
}
