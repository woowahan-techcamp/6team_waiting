//
//  WaitingTextField.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 17..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

@IBDesignable
class WaitingTextField: UITextField {

    override func awakeFromNib() {
        super.awakeFromNib()

    }

    @IBInspectable var underlineStyle: Bool = false {
        didSet {
            if self.underlineStyle {
                let border = CALayer()
                let width = CGFloat(0.4)
                border.borderColor = UIColor(red: 153/255, green: 153/255, blue: 153/255, alpha: 1.0).cgColor

                border.frame = CGRect(x: 0, y: self.frame.size.height - width, width:  self.frame.size.width, height: self.frame.size.height)

                border.borderWidth = width
                self.layer.addSublayer(border)
                self.layer.masksToBounds = true
            }
        }
    }

    override func textRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.insetBy(dx: 5, dy: 10)
    }

    override func editingRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.insetBy(dx: 5, dy: 10)
    }

}
