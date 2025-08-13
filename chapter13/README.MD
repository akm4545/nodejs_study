# **파일 업로드 기능 구현하기**  
# **프로젝트 생성 및 의존성 설치하기**  
1. 먼저 nest-cli를 사용해 실습에 사용할 프로젝트를 생성한다.  
nest new nest-file-upload --skip-git  
  
2. NestJS에서는 파일 업로드에 multer라는 패키지를 사용한다. multer는 파일 업로드에 사용되는 multipart/form-data를 다루는 Node.js 라이브러리다. 
multer는 nset-file-upload에 이미 포함되어 있다. 타입 정보가 있다면 더욱 안전한 코딩이 가능하니 타입 정보를 제공하는 @types/multer 패키지를 추가한다.  
npm i -D @types/multer  
  
