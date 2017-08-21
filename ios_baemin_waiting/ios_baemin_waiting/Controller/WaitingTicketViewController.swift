//
//  WaitingTicketViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 17..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class WaitingTicketViewController: UIViewController {

    @IBOutlet weak var phoneHeadView: UIView!
    @IBOutlet weak var stepperView: UIStepper!
    @IBOutlet weak var headCountLabel: UILabel!
    @IBOutlet weak var nameTextField: WaitingTextField!
    @IBOutlet weak var phoneNumberTextField: WaitingTextField!
    @IBOutlet weak var wrongNumberLabel: UILabel!
    @IBOutlet weak var segmentedControl: UISegmentedControl!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!

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

        phoneHeadView.layer.borderColor = UIColor(red: 153/255, green: 153/255, blue: 153/255, alpha: 1.0).cgColor
        phoneHeadView.layer.borderWidth = 0.4

        stepperView.value = 2

        nameTextField.delegate = self
        phoneNumberTextField.delegate = self

        configureNameTextField()
        configurePhoneNumberTextField()

        nameTextField.becomeFirstResponder()
        activityIndicator.isHidden = true
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
            popUpAlert(title: "인원 수 오류", message: "대기인원은 1명 이상이어야 합니다.")
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
            popUpAlert(title: "잠깐만요", message: "이름을 입력해주세요.")
        } else if phoneNumberTextField.text == "" {
            popUpAlert(title: "잠깐만요", message: "전화번호를 입력해주세요.")
        }

        guard let name = nameTextField.text else { return }
        guard let phoneNumber = phoneNumberTextField.text else { return }
        let headCount = Int(stepperView.value)
        let isStaying = segmentedControl.selectedSegmentIndex == 0 ? false : true

        let ticket = WaitingTicket(name: name, phoneNumber: phoneNumber, headCount: headCount, isStaying: isStaying)

        activityIndicator.startAnimating()
        activityIndicator.isHidden = false

        ServerRepository.postWaitingTicketCreate(params: ticket) {[weak self] isSuccess in

            self?.activityIndicator.stopAnimating()
            self?.activityIndicator.isHidden = true

            if isSuccess {
                self?.performSegue(withIdentifier: "createTicket", sender: ticket)
            } else {
                self?.popUpAlert(title: "네트워크 에러", message: "일시적인 오류로 티켓을 발행할 수 없습니다.")
            }

        }

    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "createTicket" {
            if let destination = segue.destination as? CheckTicketViewController {
                if let ticket = sender as? WaitingTicket {
                    destination.waitingTicket = ticket
                }
            }
        }
    }
}

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
                popUpAlert(title: "번호입력 오류", message: "잘못된 형식의 번호입니다.")
                return false
            }
        }
        return true
    }

    func popUpAlert(title: String, message: String) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)

        let ok = UIAlertAction(title: "OK", style: .default, handler: nil)
        alert.addAction(ok)

        self.present(alert, animated: true, completion: nil)
    }

}
