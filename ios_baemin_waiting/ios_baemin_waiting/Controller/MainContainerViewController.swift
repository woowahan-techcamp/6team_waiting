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

    var mapBtnSelected = false
    var storeList: [Store] = []

    override func viewDidLoad() {
        super.viewDidLoad()

        if UserDefaults.standard.getTicket(keyName: "ticket") == nil {
            ticketBtn.isEnabled = false
            ticketBtn.tintColor = .clear
        }
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

        if let ticket = UserDefaults.standard.getTicket(keyName: "ticket") {
            ServerRepository.postTicketValidCheck(ticketNumber: ticket.ticketNumber) { statusTicket in
                let valid = statusTicket >= 10 ? false : true

                if !valid {
                    UserDefaults.standard.removeObject(forKey: "ticket")
                }
            }
        }

    }

}
