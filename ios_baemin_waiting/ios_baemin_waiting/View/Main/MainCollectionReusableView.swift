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
         popUI.present(alert, animated: true, completion: nil)
    }

    var popUI = UIViewController()
    var alert = UIAlertController()
    var ticket = WaitingTicket(name: "", phoneNumber: "", headCount: 0, isStaying: true, storeId: 0)

    override func awakeFromNib() {
        super.awakeFromNib()

    }

    func putTicket(ticket: WaitingTicket) {
        nameLabel.text = ticket.name
        storeNameLabel.text = ticket.storeName
        orderLabel.text = "\(ticket.currentInLine) 번째"

        self.ticket = ticket
    }

    func setAlert(title: String, message: String, popUI: UIViewController) {
        alert = UIAlertController(title: title, message: message, preferredStyle: .alert)

        let ok = UIAlertAction(title: "OK", style: .destructive) { okAlertAction in

        }
        let cancle = UIAlertAction(title: "CANCLE", style: .default, handler: nil)

        alert.addAction(ok)
        alert.addAction(cancle)

        self.popUI = popUI
    }
}
