//
//  ViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 4..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MapViewController: UIViewController {

    enum State {
        case disabled
        case tracking
    }

    @IBOutlet weak var mapCollectionView: UICollectionView!

    var mapView: NMapView?
    var myLocation: NGeoPoint?
    var circleArea: NMapCircleData?
    var overlayItems: NMapPOIdataOverlay?
    var storeList: [Store] = []

    var prevOffset: CGPoint?
    var prevIndex: Int32?

    private var currentState: State = .disabled

    override func viewDidLoad() {
        super.viewDidLoad()

        NotificationCenter.default.addObserver(self, selector: #selector(dataUpdated),
                                               name: NSNotification.Name(rawValue: "dataUpdate"), object: nil)

        mapView = initMap(frame: self.view.bounds)

        if let map = mapView {
            map.delegate = self
            map.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            view.addSubview(map)
        }

        switch currentState {
        case .disabled:
            enableLocationUpdate()
            currentState = .tracking
        default:
            disableLocationUpdate()
            currentState = .disabled
        }

        view.addSubview(mapCollectionView)

        mapCollectionView.register(UINib(nibName: "MainMapCollectionViewCell", bundle: nil), forCellWithReuseIdentifier: "MainMapCollectionViewCell")

        setCollectionViewLayout()

    }

    // NotificationCenter 메소드
    func dataUpdated(_ notification: NSNotification) {

        print("Map data Updated")

        guard let storeListData = notification.userInfo?["storeData"] as? [Store] else {
            print("Error: Data not Passed")
            return
        }
        getStoreForCollectionView(storeListData: storeListData) {
            self.storeList = self.storeList.sorted { (store1: Store, store2: Store) -> Bool in
                return store1.storeDistance < store2.storeDistance
            }

            self.addMarker()
            DispatchQueue.main.async {
                self.mapCollectionView.reloadData()
            }
        }

    }

    func getStoreForCollectionView(storeListData: [Store], completion: @escaping () -> Void) {
        self.storeList = storeListData

        completion()
    }

    func setCollectionViewLayout() {
        let layout = MapCollectionViewFlowLayout()
        layout.minimumLineSpacing = 10
        layout.minimumInteritemSpacing = 0
        layout.scrollDirection = .horizontal
        layout.sectionInset = UIEdgeInsets(top: 0, left: 32, bottom: 0, right: 32)
        layout.itemSize = CGSize(width: self.view.bounds.width - 64 - 10, height: 120)
        mapCollectionView.collectionViewLayout = layout

        mapCollectionView.decelerationRate = UIScrollViewDecelerationRateFast

    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)

        mapView?.viewDidDisappear()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        mapView?.viewDidAppear()
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        mapView?.viewWillDisappear()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        currentState = .tracking
        mapView?.viewWillAppear()

        print("appear")
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
