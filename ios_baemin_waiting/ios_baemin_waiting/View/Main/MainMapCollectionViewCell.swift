//
//  MainMapCollectionViewCell.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 22..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit
import AlamofireImage

class MainMapCollectionViewCell: UICollectionViewCell {

    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!

    @IBOutlet weak var locationAndDistanceLabel: UILabel!

    @IBOutlet weak var currentInLineLabel: UILabel!

    @IBOutlet weak var waitingTitleLabel: UILabel!
    @IBOutlet weak var backView: UIView!
    @IBOutlet weak var imageWidth: NSLayoutConstraint!
    override func awakeFromNib() {
        super.awakeFromNib()

        backView.layer.borderColor = UIColor(red: 200/255, green: 200/255, blue: 200/255, alpha: 1.0).cgColor
        backView.layer.borderWidth = 0.4

        let ratio: CGFloat = 140 / 375
        imageWidth.constant = (self.backView.bounds.width - 32) * ratio
    }
    override func updateConstraints() {
        super.updateConstraints()
        if UIDevice.current.isiPhoneSE {
            titleLabel.setContentLabelFont(fontSize: 15)
            waitingTitleLabel.setSubLabelFont(fontSize: 13)
            currentInLineLabel.setTitleLabelFont(fontSize: 18)
        }

    }

    func putCellContent(storeInfo: Store) {

        titleLabel.text = storeInfo.storeName

        locationAndDistanceLabel.text = "\(storeInfo.storeShortDistance), \(Int(storeInfo.storeDistance))m"

        currentInLineLabel.text = "\(storeInfo.currentInLine)명"

        if let imgURL = storeInfo.storeImgUrl {
            imageView.af_setImage(withURL: imgURL)
        }
    }

}
