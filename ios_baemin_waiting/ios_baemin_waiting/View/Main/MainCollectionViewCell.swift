//
//  MainCollectionViewCell.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 9..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit
import AlamofireImage

class MainCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var contentItem: UIView!

    @IBOutlet weak var restaurantsImage: UIImageView!
    @IBOutlet weak var restaurantsName: UILabel!
    @IBOutlet weak var restaurantsDistance: UILabel!
    @IBOutlet weak var restaurantsLine: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()

        contentItem.layer.borderColor = UIColor(red: 216/255, green: 216/255, blue: 216/255, alpha: 1.0).cgColor
        contentItem.layer.borderWidth = 0.4
    }
    func putCellContent(storeInfo: Store) {
        restaurantsName.text = storeInfo.storeName

        restaurantsDistance.text = "\(Int(storeInfo.storeDistance))m"
        restaurantsLine.text = "1명"

        restaurantsImage.af_setImage(withURL: storeInfo.storeImgUrl!)
    }
}
