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

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var storeLabel: UILabel!
    @IBOutlet weak var orderLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.nameLabel.text = waitingTicket?.name

        // 보여주기 위해 필요한 정보
        // waitingTicket의 이름
        // 줄 선 식당
        // 줄 선 식당의 현재 대기인원

    }
    @IBAction func closeBtnTapped(_ sender: UIButton) {

        let navigationController = self.presentingViewController as? UINavigationController

        self.dismiss(animated: true) {
            navigationController?.popToRootViewController(animated: true)
        }
    }
}
