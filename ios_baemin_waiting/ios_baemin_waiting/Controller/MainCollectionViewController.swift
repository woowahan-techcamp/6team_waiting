//
//  MainCollectionViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 9..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MainCollectionViewController: UIViewController {

    let storeListManager = StoreListManager()
    let locationManager = CLLocationManager()

    let refresh = UIRefreshControl()
    let ticketView = MainCollectionReusableView()

    var storeList: [[Store]] = []
    var ticket: WaitingTicket?

    var openStoreList: [Store] = []
    var closeStoreList: [Store] = []

    // IBOutlet
    @IBOutlet weak var snackbarView: UIView!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!

    @IBOutlet weak var noResultLabel: UILabel!
    @IBOutlet weak var noResultRefreshBtn: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()

        // storeListManager용
        NotificationCenter.default.addObserver(self, selector: #selector(locationManagerFail),
                                               name: NSNotification.Name(rawValue: "locationManagerFail"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(locationManagerUpdateSuccess),
                                               name: NSNotification.Name(rawValue: "storeListDataUpdate"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(locationManagerUpdateFail),
                                               name: NSNotification.Name(rawValue: "locationManagerUpdateFail"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(storeListDataNoResult),
                                               name: NSNotification.Name(rawValue: "storeListDataNoResult"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(storeListDataServerError),
                                               name: NSNotification.Name(rawValue: "storeListDataServerError"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(endRefreshControl),
                                               name: NSNotification.Name(rawValue: "endRefreshControl"), object: nil)

        // valid ticket
        NotificationCenter.default.addObserver(self, selector: #selector(refreshTicket),
                                               name: NSNotification.Name(rawValue: "validTicket"), object: nil)

        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.isHidden = true

        refresh.addTarget(self, action: #selector(refreshDataUsingControl), for: .valueChanged)
        collectionView.addSubview(refresh)

        snackbarAnimation()

    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        WaitingTicketManager.checkValidTicket()
        startActivityIndicator()
        setDelegate()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()

    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "mainSegue" {

            startActivityIndicator()

            if let indexPath = collectionView.indexPathsForSelectedItems {

                let storeId = storeList[indexPath[0].section][indexPath[0].item].storeId
                if let detailViewController = segue.destination as? DetailViewController {
                    detailViewController.storeId = storeId

                    stopActivityIndicator()
                }
            }
        }
    }

    func snackbarAnimation() {

        UIView.animate(withDuration: 1.0, delay: 1.5, options: .transitionCrossDissolve, animations: {
            self.snackbarView.alpha = 0
        }, completion: { finished in
            if finished {
                self.snackbarView.removeFromSuperview()
            }
        })
    }

    func refreshDataUsingControl() {
        setDelegate()
        WaitingTicketManager.checkValidTicket()
    }

    func refreshData() {
        startActivityIndicator()
        collectionView.isHidden = true
        locationManager.delegate = storeListManager
        locationManager.startUpdatingLocation()
    }

    @IBAction func noResultRefreshBtnTapped(_ sender: UIButton) {
        exceptionLabel(show: true)
        refreshData()
    }

    func setDelgateNil() {
        locationManager.delegate = nil
        locationManager.stopUpdatingLocation()
    }

    func setDelegate() {
        locationManager.delegate = self.storeListManager
        locationManager.startUpdatingLocation()
    }

    func startActivityIndicator() {
        activityIndicator.startAnimating()
        activityIndicator.isHidden = false
    }

    func stopActivityIndicator() {
        activityIndicator.stopAnimating()
        activityIndicator.isHidden = true
    }

    func exceptionLabel(show: Bool) {
        noResultLabel.isHidden = show
        noResultRefreshBtn.isHidden = show
    }

    @IBAction func refreshBtnTapped(_ sender: UIButton) {
        collectionView.reloadSections(IndexSet(0..<1))
    }

    func refreshTicket(_ notification: Notification) {
        ticket = notification.userInfo?["ticket"] as? WaitingTicket
    }

    func locationManagerFail(_ notification: NSNotification) {
        setDelgateNil()

        guard let errorType = notification.userInfo?["error"] as? NMapLocationManagerErrorType else {
            return
        }

        switch errorType {
        case .unknown: fallthrough
        case .canceled: fallthrough
        case .timeout:
            noResultLabel.text = "일시적으로 내위치를 확인 할 수 없습니다."
        case .denied:
            noResultLabel.text = "위치 정보를 확인 할 수 없습니다.\n사용자의 위치 정보를 확인하도록 허용하시려면 위치서비스를 켜십시오."
        case .unavailableArea:
            noResultLabel.text = "현재 위치는 지도내에 표시할 수 없습니다."
        default:
            break
        }

        if errorType != .unknown && errorType != .unknown {
            stopActivityIndicator()
            exceptionLabel(show: false)
        }

    }

    func locationManagerUpdateSuccess(_ notification: NSNotification) {

        guard let storeListData = notification.userInfo?["storeData"] as? [[Store]] else {
            print("Error: openStore Data not Passed")
            return
        }

        self.storeList = storeListData

        DispatchQueue.main.async {
            self.collectionView.reloadData()
        }

    }
    func locationManagerUpdateFail() {
        stopActivityIndicator()
        exceptionLabel(show: false)
    }

    func storeListDataNoResult() {
        // 검색 결과가 없는 경우
        stopActivityIndicator()
        collectionView.isHidden = true
        noResultLabel.text = "주변에 줄을 설 수 있는 식당이 없습니다."
        exceptionLabel(show: false)
    }

    func storeListDataServerError() {
        // 서버에서 정보를 받아 올 수 없는 경우
        noResultLabel.text = "서버에서 정보를 받아올 수 없습니다."
        stopActivityIndicator()
        exceptionLabel(show: false)
    }

    func endRefreshControl() {
        if refresh.isRefreshing {
            refresh.endRefreshing()
        }

        setDelgateNil()
    }
}

// MARK: UICollectionViewDataSource
extension MainCollectionViewController: UICollectionViewDataSource {
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return storeList.count
    }

    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        if let sectionHeaderView = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "SectionHeader", for: indexPath) as? MainCollectionReusableView {

            WaitingTicketManager.checkValidTicket()
            sectionHeaderView.putTicket(ticket: ticket!)
            let lineCancelAlert = AlertHelper.lineCancelAlert(title: "대기취소", message: "현재 식당 대기가 취소됩니다.", waitingTicket: ticket!, popUI: self)
            sectionHeaderView.setAlert(alert: lineCancelAlert, popUI: self)

            return sectionHeaderView
        }

        return UICollectionReusableView()
    }

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return storeList[section].count
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cellId", for: indexPath) as? MainCollectionViewCell {
            cell.putCellContent(storeInfo: storeList[indexPath.section][indexPath.row])
            return cell
        }

        return UICollectionViewCell()
    }
}

// MARK: UICollectionViewDelegateFlowLayout
extension MainCollectionViewController: UICollectionViewDelegateFlowLayout {

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: (self.view.bounds.width / 2) - (15 + 7.5), height: 185)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout,
                        referenceSizeForHeaderInSection section: Int) -> CGSize {

        var size: CGSize = CGSize(width: 0, height: 0)
        if ticket != nil {
            if section == 0 {
                size = CGSize(width: self.view.bounds.width, height: self.view.bounds.height/4)
            }
        }

        return size
    }
}

// MARK: UICollectionViewDelegate
extension MainCollectionViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, willDisplay cell: UICollectionViewCell, forItemAt indexPath: IndexPath) {
        if indexPath.row == collectionView.indexPathsForVisibleItems.last?.count {
            activityIndicator.stopAnimating()
            collectionView.isHidden = false
        }
    }
}
