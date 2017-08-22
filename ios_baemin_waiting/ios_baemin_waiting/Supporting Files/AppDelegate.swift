//
//  AppDelegate.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 4..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit
import UserNotifications

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    var isAlreadyLaunched = false

    func application(_ application: UIApplication, didFinishLaunchingWithOptions
                     launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        UNUserNotificationCenter.current().delegate = self

        registerPushNotifications()

        isAlreadyLaunched = true
        return true
    }

    func registerPushNotifications() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { (granted, _) in

            if !granted {

                if var vc = self.window?.rootViewController {
                    while let next = vc.presentedViewController {
                        vc = next
                    }

                    let alert = UIAlertController(title: "푸쉬알람 설정", message: "푸쉬알람 설정이 거절되었습니다.\n해당 설정은 '설정'탭에서 변경할 수 있습니다.", preferredStyle: .alert)

                    let ok = UIAlertAction(title: "OK", style: .default, handler: nil)
                    alert.addAction(ok)

                    vc.present(alert, animated: true, completion: nil)
                }

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

}

extension AppDelegate: UNUserNotificationCenterDelegate {
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        let tokenParts = deviceToken.map { data -> String in
            return String(format: "%02.2hhx", data)
        }

        let token = tokenParts.joined()

        print("Device token: \(token)")

//        ServerRepository.saveDeviceToken(token: token) { saveSuccess in
//            if saveSuccess {
//
//            }
//        }
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("Fail to Register: \(error)")
    }

    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {

//        let aps = userInfo["aps"] as! [String: Any]

        UIApplication.shared.applicationIconBadgeNumber = 0

        if !isAlreadyLaunched {
            let storyBoard = UIStoryboard(name: "Main", bundle: nil)

            let viewController  = storyBoard.instantiateViewController(withIdentifier: "RootNavigation")

            self.window?.rootViewController = viewController

            self.window?.makeKeyAndVisible()
        }

    }



}

import Alamofire

extension ServerRepository {
    static func saveDeviceToken(token: String, completion: @escaping (Bool) -> Void) {

        let parameter: Parameters = [
            "deviceToken": token
        ]

        guard let url = URL(string: baseURL + "/storefilter")
            else {
                print("URL is nil")
                return
        }

        Alamofire.request(url, method: .post, parameters: parameter, encoding: JSONEncoding.default, headers: nil).responseJSON { response in
            guard response.result.isSuccess else {
                print("Response post WaitingTicket Error: \(response.result.error!)")
                completion(false)
                return
            }

            completion(true)
        }
    }
}
