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

        isAlreadyLaunched = true
        return true
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        print("enter foreground")

        if self.window?.rootViewController?.childViewControllers != nil {

            let rootStoryBoard = UIStoryboard(name: "Main", bundle: nil)

            let rootVC = rootStoryBoard.instantiateViewController(withIdentifier: "RootNavigation")

            if let mainContainerVC = self.window?.rootViewController?.childViewControllers[0] as? MainContainerViewController {

                let mapVC = mainContainerVC.childViewControllers[0] as? MapViewController
                let collectionVC = mainContainerVC.childViewControllers[1] as? MainCollectionViewController

                collectionVC?.refreshData()

                self.window?.rootViewController = rootVC
                self.window?.makeKeyAndVisible()
            }
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

        UserDefaults.standard.set(token, forKey: "token")

    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("Fail to Register: \(error)")
    }

//    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
//
////        let aps = userInfo["aps"] as! [String: Any]
//
//        UIApplication.shared.applicationIconBadgeNumber = 0
//
//        if !isAlreadyLaunched {
//            let storyBoard = UIStoryboard(name: "Main", bundle: nil)
//
//            let viewController  = storyBoard.instantiateViewController(withIdentifier: "RootNavigation")
//
//            self.window?.rootViewController = viewController
//
//            self.window?.makeKeyAndVisible()
//        }
//    }
}
