//
//  CheckTicketViewController.swift
//  ios_baemin_waiting
//
//  Created by 홍창남 on 2017. 8. 19..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class CheckTicketViewController: UIViewController {

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
            let ticketLine = waitingTicket?.currentInLine{

            self.ticketNumberContentLabel.text = "\(ticketNum)"
            self.nameLabel.text = waitingTicket?.name
            self.storeLabel.text = waitingTicket?.storeName
            self.orderLabel.text = "\(ticketLine) 번째"
        }

        // 보여주기 위해 필요한 정보
        // waitingTicket의 이름
        // 줄 선 식당
        // 줄 선 식당의 현재 대기인원

    }

    override func updateViewConstraints() {
        super.updateViewConstraints()

        topViewHeightConstraint.constant = self.view.bounds.height * 0.55

        topViewHeightConstraint.isActive = true
        if UIDevice.current.isiPhoneSE {
            ticketNumberLabel.setTitleLabelFont(fontSize: 30)
            ticketNumberContentLabel.setTitleLabelFont(fontSize: 60)
            nameLabel.setContentLabelFont(fontSize: 30)
            nameSubLabel.setSubLabelFont(fontSize: 30)
            storeLabel.setContentLabelFont(fontSize: 30)
            storeSubLabel.setSubLabelFont(fontSize: 30)
            orderLabel.setContentLabelFont(fontSize: 30)
            orderSubLabel.setSubLabelFont(fontSize: 30)
        }
    }
    @IBAction func closeBtnTapped(_ sender: UIButton) {

        let navigationController = self.presentingViewController as? UINavigationController

        self.dismiss(animated: true) {
            navigationController?.popToRootViewController(animated: true)
        }
    }
}
