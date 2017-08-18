//
//  StoreImageCell.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 11..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit
import AlamofireImage

class StoreImageCell: UITableViewCell {

    @IBOutlet weak var storeImage: UIImageView!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        storeImage.layer.borderWidth = 0.4
    }

    func putStoreImage(storeImgUrl: URL) {
            storeImage.af_setImage(withURL: storeImgUrl)
    }
}
