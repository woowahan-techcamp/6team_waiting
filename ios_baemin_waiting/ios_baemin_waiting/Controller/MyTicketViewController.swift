//
//  MyTicketViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 24..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MyTicketViewController: UIViewController {

    var waitingTicket: WaitingTicket?

    @IBOutlet weak var ticketNumberLabel: UILabel!
    @IBOutlet weak var ticketNumberContentLabel: UILabel!

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var nameSubLabel: UILabel!
    @IBOutlet weak var storeLabel: UILabel!
    @IBOutlet weak var storeSubLabel: UILabel!
    @IBOutlet weak var orderLabel: UILabel!
    @IBOutlet weak var orderSubLabel: UILabel!

    @IBOutlet weak var topViewHeightConstraint: NSLayoutConstraint!

    override func viewDidLoad() {
        super.viewDidLoad()

        if let ticketNum = waitingTicket?.ticketNumber,
            let ticketLine = waitingTicket?.currentInLine {
            self.ticketNumberContentLabel.text = "\(ticketNum)번"
            self.nameLabel.text = waitingTicket?.name
            self.storeLabel.text = waitingTicket?.storeName
            self.orderLabel.text = "\(ticketLine) 번째"

            let ticket = NSKeyedArchiver.archivedData(withRootObject: waitingTicket!)
            UserDefaults.standard.set(ticket, forKey: "ticket")
        }
    }

    override func updateViewConstraints() {
        super.updateViewConstraints()

        topViewHeightConstraint.constant = self.view.bounds.height * 0.70
        topViewHeightConstraint.isActive = true

        if UIDevice.current.isiPhoneSE {
            ticketNumberLabel.setTitleLabelFont(fontSize: 20)
            ticketNumberContentLabel.setTitleLabelFont(fontSize: 55)
            nameLabel.setContentLabelFont(fontSize: 20)
            nameSubLabel.setSubLabelFont(fontSize: 20)
            storeLabel.setContentLabelFont(fontSize: 20)
            storeSubLabel.setSubLabelFont(fontSize: 20)
            orderLabel.setContentLabelFont(fontSize: 20)
            orderSubLabel.setSubLabelFont(fontSize: 20)
        }
    }
    @IBAction func closeBtnTapped(_ sender: UIButton) {

        let navigationController = self.presentingViewController as? UINavigationController

        self.dismiss(animated: true) {
            navigationController?.popToRootViewController(animated: true)
        }
    }
    // 대기취소 버튼 클릭
    @IBAction func waitCancelTapped(_ sender: UIButton) {
    }
}
