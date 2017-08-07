//
//  NMacLog.h
//  ApiGateway-MAC
//
//  Created by NAVER on 2016. 1. 4..
//
//

#ifndef NMacLog_h
#define NMacLog_h

// Taken from http://iPhoneIncubator.com/blog/debugging/the-evolution-of-a-replacement-for-nslog
// DLog is almost a drop-in replacement for NSLog
// DLog();
// DLog(@"here");
// DLog(@"value: %d", x);
// Unfortunately this doesn't work DLog(aStringVariable); you have to do this instead DLog(@"%@", aStringVariable);
#ifdef DEBUG
#	define HMACDLog(fmt, ...) NSLog((@"HMACDLog %s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
#else
#	define HMACDLog(...)
#endif

// ALog always displays output regardless of the DEBUG setting
#define HMACALog(fmt, ...) NSLog((@"HMACALog %s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);


#endif /* NMacLog_h */
