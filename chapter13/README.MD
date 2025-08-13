# **파일 업로드 기능 구현하기**  
# **프로젝트 생성 및 의존성 설치하기**  
1. 먼저 nest-cli를 사용해 실습에 사용할 프로젝트를 생성한다.  
nest new nest-file-upload --skip-git  
  
2. NestJS에서는 파일 업로드에 multer라는 패키지를 사용한다. multer는 파일 업로드에 사용되는 multipart/form-data를 다루는 Node.js 라이브러리다. 
multer는 nset-file-upload에 이미 포함되어 있다. 타입 정보가 있다면 더욱 안전한 코딩이 가능하니 타입 정보를 제공하는 @types/multer 패키지를 추가한다.  
npm i -D @types/multer  
  
# **파일 업로드 API를 만들고 테스트하기**  
1. app.controller.ts 파일에 컨트롤러 코드를 작성한다. 다음과 같이 file-upload 핸들러 함수를 추가한다.  
nest-file-upload/src/app.controller.ts  
  
인터셉터는 클라이언트와 서버 간의 요청과 응답 간에 로직을 추가하는 미들웨어다. FileIntercepter()는 클라이언트의 요청에 따라 파일명이 file인 
파일이 있는지 확인한다. 함수의 인수로 넘겨준다.  
  
![img.png](image/img.png)  
  
@UploadedFile() 데코레이터는 핸들러 함수의 매개변수 데코레이터다. 인수로 넘겨진 값 중 file 객체를 지정해 꺼내는 역할을 한다. 여러 파일을 업로드할 
때 사용하는 @UploadFiles() 데코레이터도 있다. 각 파일의 타입은 Express.Multer.File 타입이다.  
  
텍스트 파일은 버퍼에 바이너리값으로 저장되어 있다. toString('utf-8')을 사용해 읽을 수 있는 문자열로 변환해준다.  
  
3. 업로드 테스트를 진행한다.  
nest-file-upload/src/file-upload.http  
  
boundary는 각 매개변수를 구분지어주는 구분자의 역할을 하며 7비트의 US-ASCII만 허용한다. 70자가 넘어서는 안된다.  
  
--에 설정한 바운더리값을 같이 주면 데이터가 여러 개일 때 구분할 수 있다. 파일 업로드 테스트 코드에는 데이터가 파일 하나만 있으므로 바운더리가 하나만 
있다.  
  
Content-Disposition은 전송하려는 매개변수가 어떤 데이터인지 정의하는 공간이다. form-data이고 이름은 file이며 파일의 이름은 text.txt로 되어 있다. 
이번에는 실제로 텍스트 파일을 전송하지는 않고 아래에 텍스트 내용을 채운다. 아래에 빈 줄이 필수다.  
  
--{바운더리 문자}--는 폼 전송을 위한 내용을 종료한다는 의미다.  
  
