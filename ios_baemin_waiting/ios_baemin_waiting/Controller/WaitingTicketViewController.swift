//
//  WaitingTicketViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 17..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit
import UserNotifications

class WaitingTicketViewController: UIViewController {

    @IBOutlet weak var phoneHeadView: UIView!
    @IBOutlet weak var stepperView: UIStepper!
    @IBOutlet weak var headCountLabel: UILabel!
    @IBOutlet weak var nameTextField: WaitingTextField!
    @IBOutlet weak var phoneNumberTextField: WaitingTextField!
    @IBOutlet weak var wrongNumberLabel: UILabel!
    @IBOutlet weak var segmentedControl: UISegmentedControl!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!

    var storeId: Int = 0

    lazy var inputToolbar: UIToolbar = {
        var toolbar = UIToolbar()
        toolbar.barStyle = .default
        toolbar.isTranslucent = true
        toolbar.sizeToFit()

        var doneButton = UIBarButtonItem(title: "완료", style: .plain, target: self, action: #selector(donePressed))
        var flexibleSpaceButton = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: nil, action: nil)
        var fixedSpaceButton = UIBarButtonItem(barButtonSystemItem: .fixedSpace, target: nil, action: nil)

        toolbar.setItems([fixedSpaceButton, fixedSpaceButton, flexibleSpaceButton, doneButton], animated: false)
        toolbar.isUserInteractionEnabled = true

        return toolbar
    }()

    override func viewDidLoad() {
        super.viewDidLoad()

        NotificationCenter.default.addObserver(self, selector: #selector(registToken),
                                               name: NSNotification.Name(rawValue: "registTicketNoti"), object: nil)
        phoneHeadView.layer.borderColor = UIColor(red: 153/255, green: 153/255, blue: 153/255, alpha: 1.0).cgColor
        phoneHeadView.layer.borderWidth = 0.4

        stepperView.value = 2

        nameTextField.delegate = self
        phoneNumberTextField.delegate = self

        configureNameTextField()
        configurePhoneNumberTextField()

        activityIndicator.isHidden = true

        if !UIApplication.shared.isRegisteredForRemoteNotifications {
            print("Register 필요")

            registerPushNotifications {
                self.nameTextField.becomeFirstResponder()
            }
        } else {
            self.nameTextField.becomeFirstResponder()
        }
    }

    func registerPushNotifications(completion: @escaping () -> Void) {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { (granted, _) in
            if !granted {
                let alert = AlertHelper.okAlert(title: "푸쉬알람 설정", message: "푸쉬알람 설정이 거절되었습니다.\n해당 설정은 '설정'탭에서 변경할 수 있습니다.")

                self.present(alert, animated: true, completion: nil)
            }
            print("Notification Permission Granted: \(granted)")

            self.getNotificationSettings()
        }
    }

    func getNotificationSettings() {
        UNUserNotificationCenter.current().getNotificationSettings { (setting) in
            print("Notification Setting: \(setting)")
            guard setting.authorizationStatus == .authorized else { return }
            UIApplication.shared.registerForRemoteNotifications()
        }
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)

        self.view.endEditing(true)
    }

    func configureNameTextField() {
        nameTextField.returnKeyType = .continue
        nameTextField.tintColor = baseOrange
    }

    func configurePhoneNumberTextField() {
        phoneNumberTextField.returnKeyType = .done
        phoneNumberTextField.keyboardType = .numberPad
        phoneNumberTextField.tintColor = baseOrange
    }

    func donePressed() {
        phoneNumberTextField.resignFirstResponder()
        wrongNumberLabel.isHidden = true
    }

    @IBAction func backgroundTapped(_ sender: UITapGestureRecognizer) {
        self.view.endEditing(true)
    }

    @IBAction func stepperValueChanged(_ sender: UIStepper) {
        if sender.value == 0 {
            sender.value = 1
            let alert = AlertHelper.okAlert(title: "인원 수 오류", message: "대기인원은 1명 이상이어야 합니다.")
            self.present(alert, animated: true, completion: nil)
        } else {
            headCountLabel.text = "\(Int(sender.value))명"
        }
    }

    @IBAction func numberTextFieldChanged(_ sender: WaitingTextField) {
        wrongNumberLabel.isHidden = false
        guard let text = sender.text else { return }

        let result1 = validateInput(expression: "\\d{3}\\d{4}$", value: text)
        let result2 = validateInput(expression: "\\d{4}\\d{4}$", value: text)

        if !result1 && !result2 {
            wrongNumberLabel.text = "잘못된 형식의 번호입니다."
            wrongNumberLabel.textColor = UIColor(red: 244/255, green: 67/255, blue: 54/255, alpha: 1.0)
        } else {
            wrongNumberLabel.text = "올바른 형식의 번호입니다."
            wrongNumberLabel.textColor = UIColor(red: 27/255, green: 123/255, blue: 236/255, alpha: 1)
        }
    }

    @IBAction func makeWaitingTicketTapped(_ sender: UIButton) {
        if nameTextField.text == "" {

            let alert = AlertHelper.okAlert(title: "잠깐만요", message: "이름을 입력해주세요.")
            self.present(alert, animated: true, completion: nil)

            return
        } else if phoneNumberTextField.text == "" {
            let alert = AlertHelper.okAlert(title: "잠깐만요", message: "전화번호를 입력해주세요.")
            self.present(alert, animated: true, completion: nil)

            return
        }

        guard let name = nameTextField.text else { return }
        guard let phoneNumber = phoneNumberTextField.text else { return }
        let headCount = Int(stepperView.value)
        let isStaying = segmentedControl.selectedSegmentIndex == 0 ? false : true

        let ticket = WaitingTicket(name: name, phoneNumber: phoneNumber, headCount: headCount, isStaying: isStaying, storeId: storeId)

        activityIndicator.startAnimating()
        activityIndicator.isHidden = false

        WaitingTicketManager.regist(ticket: ticket)

        sender.isEnabled = false
    }

    func registToken(_ notification: Notification) {
        if let registTicketResult = notification.userInfo {
            if let registerSuccess = registTicketResult["isSuccess"] as? Bool {
                if registerSuccess {
                    self.activityIndicator.stopAnimating()
                    self.activityIndicator.isHidden = true

                    if let ticket = registTicketResult["registTicket"] as? WaitingTicket {

                        if let token = UserDefaults.standard.object(forKey: "token") as? String {

                            ServerRepository.saveDeviceTokenToServer(ticketNumber: ticket.ticketNumber, token: token) { saveSuccess in
                                if saveSuccess {
                                    print("Success Saving Token")
                                }
                                self.performSegue(withIdentifier: "showTicketResult", sender: ticket)
                            }
                        } else {
                            let alert = AlertHelper.okAlert(title: "알람 설정 필요", message: "티켓을 발행하기 위해서는 알람 설정이 필요합니다.\n알람 설정은 '설정'탭에서 확인할 수 있습니다.")
                            self.present(alert, animated: true, completion: nil)
                        }
                    }
                }
            }
        }
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showTicketResult" {
            if let destination = segue.destination as? MyTicketViewController {
                if let ticket = sender as? WaitingTicket {
                    destination.waitingTicket = ticket
                }
            }
        }
    }
}

// MARK: UITextFieldDelegate
extension WaitingTicketViewController: UITextFieldDelegate {

    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        if textField == phoneNumberTextField {
            textField.inputAccessoryView = inputToolbar
        }
        return true
    }

    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if textField == nameTextField {
            self.phoneNumberTextField.becomeFirstResponder()
        } else {
            phoneNumberTextField.resignFirstResponder()
        }

        return true
    }

    func validateInput(expression: String, value: String) -> Bool {
        let test = NSPredicate(format: "SELF MATCHES %@", expression)
        let result = test.evaluate(with: value)

        return result
    }
    func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {

        if textField == phoneNumberTextField {
            guard let text = textField.text else { return true }

            let result1 = validateInput(expression: "\\d{3}\\d{4}$", value: text)
            let result2 = validateInput(expression: "\\d{4}\\d{4}$", value: text)

            if text != "" && !result1 && !result2 {
                let alert = AlertHelper.okAlert(title: "번호입력 오류", message: "잘못된 형식의 번호입니다.")
                self.present(alert, animated: true, completion: nil)

                return false
            }
        }
        return true
    }
}
