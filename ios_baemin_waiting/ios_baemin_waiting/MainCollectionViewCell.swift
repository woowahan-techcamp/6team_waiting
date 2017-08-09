//
//  MainCollectionViewCell.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 9..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MainCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var contentItem: UIView!

    @IBOutlet weak var restaurantsImage: UIImageView!
    @IBOutlet weak var restaurantsName: UILabel!
    @IBOutlet weak var restaurantsDistance: UILabel!
    @IBOutlet weak var restaurantsLine: UILabel!

    func putCellContent(restaurantsInfo: RestaurantsLocationInfo) {
        restaurantsName.text = restaurantsInfo.restaurantName
        restaurantsDistance.text = restaurantsInfo.restaurantsAddress
        restaurantsLine.text = "1명"
    }
}
