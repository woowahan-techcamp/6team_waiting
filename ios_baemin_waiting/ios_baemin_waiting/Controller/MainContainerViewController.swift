//
//  MainContainerViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 9..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MainContainerViewController: UIViewController {

    // IBOutlet
    @IBOutlet weak var mapView: UIView!
    @IBOutlet weak var listContainerView: UIView!

    @IBOutlet weak var searchBtn: UIBarButtonItem!
    @IBOutlet weak var mapBtn: UIBarButtonItem!
    @IBOutlet weak var ticketBtn: UIBarButtonItem!

    var ticket: WaitingTicket?

    var mapBtnSelected = false

    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self, selector: #selector(refreshTicket),
                                               name: NSNotification.Name(rawValue: "validTicket"), object: nil)
    }

    func refreshTicket(_ notification: Notification) {
        ticket = notification.userInfo?["ticket"] as! WaitingTicket?
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    // IBAction
    @IBAction func mapBtnTapped(_ sender: UIBarButtonItem) {
        mapBtnSelected = !mapBtnSelected

        if mapBtnSelected {
            mapBtn.image = #imageLiteral(resourceName: "list")

            UIView.animate(withDuration: 0.5, animations: {
                self.mapView.alpha = 1
                self.listContainerView.alpha = 0
            })
        } else {
            mapBtn.image = #imageLiteral(resourceName: "map")

            UIView.animate(withDuration: 0.5, animations: {
                self.listContainerView.alpha = 1
                self.mapView.alpha = 0
            })
        }

    }
    @IBAction func ticketShowBtnTapped(_ sender: UIBarButtonItem) {

        guard let mainCollectionVC = self.childViewControllers[1] as? MainCollectionViewController else { return }

        mainCollectionVC.startActivityIndicator()

        if ticket != nil {
            self.performSegue(withIdentifier: "myTicketSegue", sender: nil)
        } else {
            let alert = AlertHelper.okAlert(title: "티켓 없음", message: "현재 등록된 티켓이 없습니다.")
            self.present(alert, animated: true, completion: nil)
        }

    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "myTicketSegue" {
            if let myTicketViewController = segue.destination as? MyTicketViewController {
                if let myTicket = UserDefaults.standard.getTicket(keyName: "ticket") {
                    myTicketViewController.waitingTicket = myTicket
                }
            }
        }
    }

}
