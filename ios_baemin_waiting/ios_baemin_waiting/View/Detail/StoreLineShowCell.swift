//
//  StoreLineShowCell.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 11..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class StoreLineShowCell: UITableViewCell {

    @IBOutlet weak var lineNumberLabel: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    func putlineNumber(lineNumber: Int) {
        lineNumberLabel.text = "\(lineNumber) 명"
    }
}
