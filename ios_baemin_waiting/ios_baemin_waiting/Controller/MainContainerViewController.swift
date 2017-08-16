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

    var mapBtnSelected = false
    var storeList: [Store] = []

    override func viewDidLoad() {
        super.viewDidLoad()

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

}
