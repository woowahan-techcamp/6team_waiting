//
//  WaitingTicketViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 17..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class WaitingTicketViewController: UIViewController {

    enum InputNilError {
        case nameFieldEmpty
        case numberFieldEmpty
        case noError
    }

    @IBOutlet weak var phoneHeadView: UIView!
    @IBOutlet weak var stepperView: UIStepper!
    @IBOutlet weak var headCountLabel: UILabel!
    @IBOutlet weak var nameTextField: WaitingTextField!
    @IBOutlet weak var phoneNumberTextField: WaitingTextField!

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
    }

    func configureNameTextField() {
        nameTextField.returnKeyType = .continue
    }
    func configurePhoneNumberTextField() {
        phoneNumberTextField.returnKeyType = .done
        phoneNumberTextField.keyboardType = .numberPad
    }

    func donePressed() {
        print("done")
        phoneNumberTextField.resignFirstResponder()
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
    @IBAction func makeWaitingTicketTapped(_ sender: UIButton) {
        var errorType: InputNilError = .noError
        if nameTextField.text == "" {
            errorType = .nameFieldEmpty
        } else if phoneNumberTextField.text == "" {
            errorType = .numberFieldEmpty
        }

        switch errorType {
        case .nameFieldEmpty:
            popUpAlert(title: "오류", message: "이름을 입력하지 않았습니다.")
        case .numberFieldEmpty:
            popUpAlert(title: "오류", message: "전화번호를 입력하지 않았습니다.")
        default:
            break
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

    func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {

        func validateInput(expression: String, value: String) -> Bool {
            let test = NSPredicate(format: "SELF MATCHES %@", expression)
            let result = test.evaluate(with: value)

            return result
        }

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
