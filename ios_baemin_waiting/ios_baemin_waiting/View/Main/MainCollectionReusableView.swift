//
//  MainCollectionReusableView.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 9..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MainCollectionReusableView: UICollectionReusableView {
    @IBOutlet weak var headerContents: UIView!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var storeNameLabel: UILabel!
    @IBOutlet weak var orderLabel: UILabel!

    @IBAction func lineCancleButton(_ sender: Any) {
    }

    override func awakeFromNib() {
        super.awakeFromNib()
    }

    func putTicket(ticket: WaitingTicket) {
        nameLabel.text = ticket.name
        storeNameLabel.text = ticket.storeName
        orderLabel.text = "\(ticket.currentInLine) 번째"
    }
}
