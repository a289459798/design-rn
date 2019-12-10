//
//  FileHelper.h
//  Pet-Doctor
//
//  Created by zhangzy on 15/6/2.
//  Copyright (c) 2015年 zhangzy. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CommonCrypto/CommonDigest.h>

@interface FileHelper : NSObject

+ (NSString *)getCachePath;

+ (BOOL)fileExists:(NSString *)filePath;

+ (void)createFile:(NSString *)filePath;

+ (void)write:(NSString *)filePath data:(NSString *)content;

+ (void)writeImage:(NSString *)filePath data:(NSData *)content;


+ (NSString *)readData:(NSString *)filePath;

+ (NSDate *)getFileCreateTime:(NSString *)filePath;

// 计算单个文件大小
+ (float)fileSizeAtPath:(NSString*)path;
// 计算目录大小
+ (float)folderSizeAtPath:(NSString*)path;
// 清除文件按
+ (void)clearCache:(NSString *)path;

+ (NSString *)md5:(NSString *)str;

@end
