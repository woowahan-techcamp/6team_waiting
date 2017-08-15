//
//  UIButton+Underline.swift
//  ios_baemin_waiting
//
//  Created by 홍창남 on 2017. 8. 15..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

// 버튼 밑줄 긋기
private var _underLineBtnText = false
extension UIButton {

    @IBInspectable var underlineBtnText: Bool {
        get {
            return _underLineBtnText
        } set {
            _underLineBtnText = newValue

            if _underLineBtnText {
                let text = self.currentTitle
                let titleString = NSMutableAttributedString(string: text!)
                titleString.addAttribute(NSUnderlineStyleAttributeName, value: NSUnderlineStyle.styleSingle.rawValue, range: NSMakeRange(0, (text?.characters.count)!))

                titleString.addAttributes([NSForegroundColorAttributeName: UIColor.white], range: NSMakeRange(0, (text?.characters.count)!))


                self.setAttributedTitle(titleString, for: .normal)


            }
        }
    }
}
