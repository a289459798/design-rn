//
//  RNSplashScreen.m
//  Base64
//
//  Created by zhangzy on 2019/12/10.
//

#import "RNSplashScreen.h"
#import "FLAnimatedImageView.h"
#import "FLAnimatedImage.h"
#import "FileHelper.h"

static UIView *_view;
static FLAnimatedImageView *_imageView;
static float _time;
static NSTimer *_timer;

@implementation RNSplashScreen {
    RCTResponseSenderBlock _block;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

+(void)show {
    
    UIWindow *window = [[UIApplication sharedApplication] delegate].window;
    CGSize viewSize = window.bounds.size;
    NSString *viewOrientation = @"Portrait";
    NSArray* imagesDict = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchImages"];
    for (NSDictionary* dict in imagesDict) {
        CGSize imageSize = CGSizeFromString(dict[@"UILaunchImageSize"]);
        if (CGSizeEqualToSize(imageSize, viewSize) && [viewOrientation isEqualToString:dict[@"UILaunchImageOrientation"]]) {
            
            NSString *lanuchImage = dict[@"UILaunchImageName"];
            _view = [[UIView alloc] initWithFrame:window.bounds];
            UIImageView *launchView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:lanuchImage]];
            launchView.frame = window.bounds;
            launchView.contentMode = UIViewContentModeScaleAspectFill;
            [_view addSubview:launchView];
            float marginBottom = 100.0 / 667 * window.bounds.size.height;
            _imageView = [[FLAnimatedImageView alloc] initWithFrame:CGRectMake(0, 0, window.bounds.size.width, window.bounds.size.height - marginBottom)];
            _imageView.contentMode = UIViewContentModeScaleAspectFill;
            _imageView.clipsToBounds = YES;
            
            [_view addSubview:_imageView];
            [_view bringSubviewToFront:_imageView];
            
            [window.rootViewController.view addSubview:_view];
            [window.rootViewController.view bringSubviewToFront:_view];
            break;
        }
    }
}

+ (void)hide {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        if(_timer != nil) {
            [_timer invalidate];
            _timer = nil;
        }
        [UIView animateWithDuration:1.0f delay:0.1f options:UIViewAnimationOptionBeginFromCurrentState animations:^{
            _view.alpha = 0.0f;
            _view.layer.transform = CATransform3DScale(CATransform3DIdentity, 1.2, 1.2, 1);
            
        } completion:^(BOOL finished) {
            [_view removeFromSuperview];
        }];
    });
}

- (void) click {
    
    if(_block != nil) {
        _block(@[]);
        _block = nil;
    }
}

RCT_EXPORT_METHOD(hide) {
    [RNSplashScreen hide];
}

- (void)updateProgress {
    _time -= 1;
    if(_time <= 0) {
        [self hide];
    }
}

RCT_EXPORT_METHOD(showAd: (NSString *) imageUrl
                  time: (int)time
                  Callback: (RCTResponseSenderBlock)callback) {
    
    _block = callback;
    NSString *localImage = [NSString stringWithFormat: @"%@/%@", [FileHelper getCachePath], [FileHelper md5:imageUrl]];
    if([FileHelper fileExists:localImage]) {
        // 显示
        uint8_t c;
        NSData *imageData = [NSData dataWithContentsOfFile:localImage];
        [imageData getBytes:&c length:1];
        dispatch_async(dispatch_get_main_queue(), ^{
            _time = time;
            // 判断图片类型
            switch (c) {
                case 0x47:
                    _imageView.animatedImage = [FLAnimatedImage animatedImageWithGIFData:imageData];
                    break;
                default:
                    [_imageView setImage:[UIImage imageNamed: localImage]];
                    break;
            }
            
            UILabel *textLabel = [[UILabel alloc] initWithFrame:CGRectMake(_imageView.bounds.size.width - 50, _imageView.bounds.size.height - 50, 40, 25)];
            textLabel.text = @"跳过";
            textLabel.font = [UIFont systemFontOfSize:12];
            textLabel.textAlignment = NSTextAlignmentCenter;
            textLabel.textColor = [UIColor whiteColor];
            textLabel.backgroundColor = [UIColor colorWithRed:0/255 green:0/255 blue:0/255 alpha:0.2];
            [textLabel setUserInteractionEnabled:YES];
            UITapGestureRecognizer *pass = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(hide)];
            [textLabel addGestureRecognizer:pass];
            
            [_imageView addSubview:textLabel];
            [_imageView setUserInteractionEnabled:YES];
            UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(click)];
            [_imageView addGestureRecognizer:tap];
            
            _timer = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(updateProgress) userInfo:nil repeats:YES];
        });
    } else {
        // 下载
        [RNSplashScreen hide];
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:imageUrl]];
            [FileHelper writeImage:localImage data:imageData];
            callback(@[localImage]);
        });
    }
}

@end
