//
//  RNImageBrowser.m
//  Base64
//
//  Created by zhangzy on 2019/12/11.
//

#import "RNImageBrowser.h"
#import "PYPhotoBrowser.h"

@implementation RNImageBrowser

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(show:(NSArray *)list index:(int)index) {
    
    NSMutableArray *originalImageUrls = [NSMutableArray array];
    // 添加图片
    for(int i = 0; i < list.count; i++) {
        [originalImageUrls addObject:list[i]];
    }
    
    PYPhotosView *photosView = [PYPhotosView photosViewWithThumbnailUrls:@[] originalUrls:originalImageUrls];
    // 3. 添加photosView
    [[UIApplication sharedApplication].keyWindow.rootViewController.view addSubview:photosView];
    
}

@end
