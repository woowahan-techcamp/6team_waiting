//
//  MainCollectionViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 9..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MainCollectionViewController: UIViewController {

    let locationManager = CLLocationManager()
    var storeList: [Store] = []
    let refresh = UIRefreshControl()
    let ticketView = MainCollectionReusableView()

    // IBOutlet
    @IBOutlet weak var snackbarView: UIView!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!

    @IBOutlet weak var noResultLabel: UILabel!
    @IBOutlet weak var noResultRefreshBtn: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()

        NotificationCenter.default.addObserver(self, selector: #selector(updateError),
                                               name: NSNotification.Name(rawValue: "updateError"), object: nil)

        collectionView.dataSource = self
        collectionView.delegate = self

        collectionView.isHidden = true

        locationManager.delegate = self
        locationManager.startUpdatingLocation()

        refresh.addTarget(self, action: #selector(refreshDataUsingControl), for: .valueChanged)
        collectionView.addSubview(refresh)

        snackbarAnimation()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        startActivityIndicator()
        locationManager.delegate = self
        locationManager.startUpdatingLocation()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()

    }

    func updateError(_ notification: NSNotification) {
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

            noResultLabel.isHidden = false
            noResultRefreshBtn.isHidden = false
        }

    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "mainSegue" {

            startActivityIndicator()

            if let indexPath = collectionView.indexPathsForSelectedItems {
                let storeId = storeList[indexPath[0].item].storeId
                if let detailViewController = segue.destination as? DetailViewController {
                    detailViewController.storeId = storeId

                    stopActivityIndicator()

                    detailViewController.navigationItem.leftBarButtonItem = splitViewController?.displayModeButtonItem
                    detailViewController.navigationItem.leftItemsSupplementBackButton = true
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
        locationManager.delegate = self
        locationManager.startUpdatingLocation()
    }
    func refreshData() {
        startActivityIndicator()
        collectionView.isHidden = true
        locationManager.delegate = self
        locationManager.startUpdatingLocation()
    }
    @IBAction func noResultRefreshBtnTapped(_ sender: UIButton) {
        exceptionLabel(show: true)
        refreshData()
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
        refreshData()
    }

}

// MARK: UICollectionViewDataSource
extension MainCollectionViewController: UICollectionViewDataSource {
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        if let sectionHeaderView = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "SectionHeader", for: indexPath) as? MainCollectionReusableView {

            if UserDefaults.standard.object(forKey: "ticket") != nil {
                let archiveTicket = UserDefaults.standard.object(forKey: "ticket")
                let ticket = NSKeyedUnarchiver.unarchiveObject(with: archiveTicket as! Data) as! WaitingTicket

                ServerRepository.postMylineCheck(ticket: ticket) {
                    
                }

                sectionHeaderView.putTicket(ticket: ticket)
                sectionHeaderView.setAlert(title: "대기취소", message: "현재 식당에서 대기가 취소됩니다.", popUI: self)
            }

            return sectionHeaderView
        }

        return UICollectionReusableView()
    }

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return storeList.count
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cellId", for: indexPath) as? MainCollectionViewCell {
            cell.putCellContent(storeInfo: storeList[indexPath.row])
            return cell
        }

        return UICollectionViewCell()
    }
}

extension MainCollectionViewController: UICollectionViewDelegateFlowLayout {

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: (self.view.bounds.width / 2) - (15 + 7.5), height: 185)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForHeaderInSection section: Int) -> CGSize {

        let size = UserDefaults.standard.object(forKey: "ticket") == nil ? CGSize(width: 0, height: 0) : CGSize(width: self.view.bounds.width, height: self.view.bounds.height/4)

        return size
    }

}

extension MainCollectionViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, willDisplay cell: UICollectionViewCell, forItemAt indexPath: IndexPath) {
        if indexPath.row == collectionView.indexPathsForVisibleItems.last?.count {
            activityIndicator.stopAnimating()
            collectionView.isHidden = false
        }
    }
}

extension MainCollectionViewController: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        self.locationManager.stopUpdatingLocation()
        self.locationManager.delegate = nil
        print("CLLocation Manager Update Error")

        stopActivityIndicator()

        exceptionLabel(show: false)

    }
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        startActivityIndicator()

        guard let currentLocation = locations.last else { return }

        print("Location Update Called")

        //화면로딩시 userDefault의 티켓값이 유효인지 확인
        if let ticket = UserDefaults.standard.getTicket(keyName: "ticket") {
            ServerRepository.postTicketValidCheck(ticketNumber: ticket.ticketNumber) { statusTicket in
                let valid = statusTicket >= 10 ? false : true

                if !valid {
                    UserDefaults.standard.removeObject(forKey: "ticket")
                }
            }
        }

        ServerRepository.postCurrentLocation(currentLocation: currentLocation) { isSuccess, storeData in

            if isSuccess {
                self.storeList = storeData

                print("Location Update Success")

                if self.storeList.count > 0 {
                    self.storeList = self.storeList.sorted { (store1: Store, store2: Store) -> Bool in
                        return store1.storeDistance < store2.storeDistance
                    }

                    NotificationCenter.default.post(name: NSNotification.Name(rawValue: "dataUpdate"),
                                                    object: nil, userInfo: ["storeData": self.storeList])

                    self.collectionView.reloadData()

                } else {
                    // 검색 결과가 없는 경우
                    self.stopActivityIndicator()
                    self.collectionView.isHidden = true
                    self.noResultLabel.text = "주변에 줄을 설 수 있는 식당이 없습니다."
                    self.noResultLabel.isHidden = false
                    self.noResultRefreshBtn.isHidden = false
                }
            } else {
                // 서버에서 정보를 받아 올 수 없는 경우
                self.noResultLabel.text = "서버에서 정보를 받아올 수 없습니다."
                self.activityIndicator.stopAnimating()
                self.activityIndicator.isHidden = true
                self.noResultLabel.isHidden = false
                self.noResultRefreshBtn.isHidden = false
            }
        }

        if refresh.isRefreshing {
            refresh.endRefreshing()
        }

        locationManager.stopUpdatingLocation()
        locationManager.delegate = nil
    }

    
}

extension UserDefaults {
    func getTicket(keyName: String) -> WaitingTicket? {
        if self.object(forKey: keyName) != nil {
            guard let archiveTicket = UserDefaults.standard.object(forKey: keyName) as? Data else {
                return nil
            }
            guard let ticket = NSKeyedUnarchiver.unarchiveObject(with: archiveTicket) as? WaitingTicket else {
                return nil
            }

            return ticket
        }
        return nil
    }
}
