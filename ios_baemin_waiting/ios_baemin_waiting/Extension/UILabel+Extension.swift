//
//  UILabel+Extension.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 29..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

let regularSDNeo = "AppleSDGothicNeo-Regular"
let mediumSDNeo = "AppleSDGothicNeo-Medium"
let ultraSDNeo = "AppleSDGothicNeo-UltraLight"
let boldSDNeo = "AppleSDGothicNeo-Bold"

extension UILabel {
    func setSubLabelFont(fontSize: CGFloat) {
        self.font = UIFont(name: ultraSDNeo, size: fontSize)
    }

    func setContentLabelFont(fontSize: CGFloat) {
        self.font = UIFont(name: mediumSDNeo, size: fontSize)
    }

    func setTitleLabelFont(fontSize: CGFloat) {
        self.font = UIFont(name: boldSDNeo, size: fontSize)
    }
}
