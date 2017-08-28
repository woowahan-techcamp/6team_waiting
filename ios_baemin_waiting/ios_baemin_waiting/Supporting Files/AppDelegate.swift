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

    func application(_ application: UIApplication, didFinishLaunchingWithOptions
                     launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        UNUserNotificationCenter.current().delegate = self
        return true
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        print("enter foreground")

        // background에서 앱 실행시 Main 화면 리프레시 후 호출
        if self.window?.rootViewController?.childViewControllers != nil {

            let rootStoryBoard = UIStoryboard(name: "Main", bundle: nil)

            let rootVC = rootStoryBoard.instantiateViewController(withIdentifier: "RootNavigation")

            if let mainContainerVC = self.window?.rootViewController?.childViewControllers[0] as? MainContainerViewController {

                if let mapVC = mainContainerVC.childViewControllers[0] as? MapViewController,
                    let collectionVC = mainContainerVC.childViewControllers[1] as? MainCollectionViewController {

                    collectionVC.refreshData()
                    mapVC.mapView?.setZoomLevel(11)
                }
                self.window?.rootViewController = rootVC
                self.window?.makeKeyAndVisible()
            }
        }
    }
    func applicationDidBecomeActive(_ application: UIApplication) {
        UIApplication.shared.applicationIconBadgeNumber = 0
        // badge 숫자 리셋
    }
}

extension AppDelegate: UNUserNotificationCenterDelegate {
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        let tokenParts = deviceToken.map { data -> String in
            return String(format: "%02.2hhx", data)
        }
        let token = tokenParts.joined()

        print("Device token: \(token)")

        UserDefaults.standard.set(token, forKey: "token")

    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("Fail to Register: \(error)")
    }

    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        if let aps = userInfo["aps"] as? [String: Any] {
            UIApplication.shared.applicationIconBadgeNumber = aps["badge"] as! Int
        }
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
         completionHandler(.alert)
    }
}
