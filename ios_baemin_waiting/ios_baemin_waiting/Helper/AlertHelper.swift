//
//  AlertHelper.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 28..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

class AlertHelper {
    static func okAlert(title: String, message: String) -> UIAlertController {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)

        let ok = UIAlertAction(title: "OK", style: .default, handler: nil)
        alert.addAction(ok)
        return alert
    }

    static func lineCancelAlert(title: String, message: String, waitingTicket: WaitingTicket, popUI: UIViewController) -> UIAlertController {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)

        let ok = UIAlertAction(title: "OK", style: .destructive) { (action:UIAlertAction!) in
            ServerRepository.postCancleLine(ticket: waitingTicket) { isSuccess in
                if isSuccess == 1 {
                    UserDefaults.standard.removeObject(forKey: "ticket")
                }
            }

            let navigationController = popUI.presentingViewController as? UINavigationController

            popUI.dismiss(animated: true) {
                navigationController?.popToRootViewController(animated: true)
            }
        }
        let cancle = UIAlertAction(title: "CANCLE", style: .default, handler: nil)
        alert.addAction(ok)
        alert.addAction(cancle)

        return alert
    }
}
