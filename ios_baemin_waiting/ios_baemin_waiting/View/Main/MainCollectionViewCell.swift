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

    @IBOutlet weak var storeStatusBackground: UIView!
    @IBOutlet weak var storeStatusLabel: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()

        contentItem.layer.borderColor = UIColor(red: 216/255, green: 216/255, blue: 216/255, alpha: 1.0).cgColor
        contentItem.layer.borderWidth = 0.4
    }

    override func prepareForReuse() {
        restaurantsImage.image = nil
    }
    func putCellContent(storeInfo: Store) {
        restaurantsName.text = storeInfo.storeName
        restaurantsDistance.text = "\(Int(storeInfo.storeDistance))m"
        restaurantsLine.text = "\(Int(storeInfo.currentInLine))명"

        restaurantsImage.af_setImage(withURL: storeInfo.storeImgUrl!)

        switch storeInfo.storeIsOpened {
        case false:
            storeStatusBackground.isHidden = false
            storeStatusLabel.isHidden = false
            storeStatusLabel.text = "오픈 준비중입니다."

        default:
            storeStatusBackground.isHidden = true
            storeStatusLabel.isHidden = true
        }
    }
}
