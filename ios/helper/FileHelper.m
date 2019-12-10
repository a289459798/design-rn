//
//  FileHelper.m
//  Pet-Doctor
//
//  Created by zhangzy on 15/6/2.
//  Copyright (c) 2015年 zhangzy. All rights reserved.
//

#import "FileHelper.h"

@implementation FileHelper

#pragma mark - 获取缓存文件路径
+ (NSString *)getCachePath {
    return [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) objectAtIndex:0];
}

#pragma mark - 判断文件是否存在
+ (BOOL)fileExists:(NSString *)filePath {
    NSFileManager *fileManager = [NSFileManager defaultManager];
        
    if(![fileManager fileExistsAtPath:filePath]) {
        return NO;
    }
    return YES;
}

# pragma mark - 获取文件创建时间
+ (NSDate *)getFileCreateTime:(NSString *)filePath {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSDictionary *fileAttributes = [fileManager attributesOfItemAtPath:filePath error:nil];
    if (fileAttributes != nil) {
        return [fileAttributes objectForKey:NSFileCreationDate];
    }
    return nil;
}

#pragma mark - 创建文件
+ (void)createFile:(NSString *)filePath {
    NSFileManager *fileManager = [NSFileManager defaultManager];

    [fileManager createFileAtPath:filePath contents:nil attributes:nil];
}

#pragma mark - 写入文件
+ (void)write:(NSString *)filePath data:(NSString *)content {
    if (![self fileExists:filePath]) {
        [self createFile:filePath];
    }
    
    NSLog(@"写入文件内容:%@", content);
    
    [content writeToFile:filePath atomically:YES encoding:NSUTF8StringEncoding error:nil];
}

+ (void)writeImage:(NSString *)filePath data:(NSData *)content {
    
    [content writeToFile:filePath atomically:YES];
    
}

#pragma mark - 读取文件
+ (NSString *)readData:(NSString *)filePath {
    return [NSString stringWithContentsOfFile:filePath usedEncoding:nil error:nil];
}

+ (float)fileSizeAtPath:(NSString *)path
{
    
    NSFileManager *fileManager=[NSFileManager defaultManager];
    
    if([fileManager fileExistsAtPath:path]){
        
        long long size = [fileManager attributesOfItemAtPath:path error:nil].fileSize;
        // 返回值是字节 B K M
        
        return size/1024.0/1024.0;
        
    }
    
    return 0;
    
}

//计算目录大小

+ (float)folderSizeAtPath:(NSString *)path
{
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    
    float folderSize = 0.0f;
    
    if ([fileManager fileExistsAtPath:path]) {
        
        NSArray *childerFiles=[fileManager subpathsAtPath:path];
        
        for (NSString *fileName in childerFiles) {
            
            NSString *absolutePath = [path stringByAppendingPathComponent:fileName];
            
            
            // 计算单个文件大小
            folderSize += [self fileSizeAtPath:absolutePath];
            
        }
        
        return folderSize;
        
    }
    
    return 0;
    
}
//清理缓存文件

//同样也是利用NSFileManager API进行文件操作，SDWebImage框架自己实现了清理缓存操作，我们可以直接调用。

+ (void)clearCache:(NSString *)path
{
    
    NSFileManager *fileManager=[NSFileManager defaultManager];
    
    if ([fileManager fileExistsAtPath:path]) {
        
        NSArray *childerFiles=[fileManager subpathsAtPath:path];
        
        for (NSString *fileName in childerFiles) {
            
            //如有需要，加入条件，过滤掉不想删除的文件
            
            NSString *absolutePath = [path stringByAppendingPathComponent:fileName];
            
            [fileManager removeItemAtPath:absolutePath error:nil];
            
        }
        
    }
        
}

+ (NSString *) md5:(NSString *)str {
    
    if (!str) {
        return str;
    }
    
    const char *cStr = [str UTF8String];
    unsigned char result[16];
    CC_MD5( cStr, strlen(cStr), result );
    return [NSString stringWithFormat:@"%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X",
            result[0], result[1], result[2], result[3],
            result[4], result[5], result[6], result[7],
            result[8], result[9], result[10], result[11],
            result[12], result[13], result[14], result[15]];
}

@end
