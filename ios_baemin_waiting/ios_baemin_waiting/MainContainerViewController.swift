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

    var toggleBtnSelected = false

    override func viewDidLoad() {
        super.viewDidLoad()

    }

    // IBAction
    @IBAction func mainToggleBtnTapped(_ sender: UIBarButtonItem) {
        toggleBtnSelected = !toggleBtnSelected

        if toggleBtnSelected {
            sender.setBackgroundImage(#imageLiteral(resourceName: "1px_dot"), for: .normal, barMetrics: .default)
            UIView.animate(withDuration: 0.5, animations: {
                self.mapView.alpha = 1
                self.listContainerView.alpha = 0
            })
        } else {
            sender.setBackgroundImage(#imageLiteral(resourceName: "1px_dot"), for: .normal, barMetrics: .default)
            UIView.animate(withDuration: 0.5, animations: {
                self.listContainerView.alpha = 1
                self.mapView.alpha = 0
            })
        }

    }
}
