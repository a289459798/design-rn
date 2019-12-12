require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNDesignRn"
  s.version      = package["version"]
  s.summary      = package['description']
  s.author       = package['author']
  s.homepage     = package['homepage']
  s.license      = package['license']
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "zhangzy@5ichong.cn" }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://gitee.com/petdoctor/design-rn.git", :tag => "master" }
  s.source_files  = "ios/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "SDWebImage", "~> 0.5"
  s.dependency "KSPhotoBrowser", "~> 0.3.0"

end

