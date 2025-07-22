# **회원 가입과 인증하기**  
# **실습용 프로젝트 설정하기**  
# **nest-cli로 프로젝트 생성하기**  
1. nest-cli에서 다음 명령을 입력해 프로젝트를 생성한다.  
nest new nest-auth-test  
  
이번에는 더 복잡한 구조의 프로그램을 만들게 되므로 AuthModule과 UserModule을 추가로 만들어 사용한다. AppModule에는 전체 애플리케이션 관련 설정을, 
AutModule에는 인증 관련 기능을, UserModule 모듈에는 유저 데이터를 다루는 기능을 구현한다. 다음과 같이 AppModule의 하위에 AuthModule과 UserModule을 
둔다.  
  
![img.png](image/img.png)  
  
인증을 담당하는 AuthModule은 AuthController, AuthService 클래스로 구성된다. AuthController에는 인증에 필요한 핸들러 메서드를 설정한다. 
AuthService에는 회원 가입과 회원 유효성을 검증하는 메서드를 추가한다. AuthService의 회원 가입 메서드에서 UserService를 주입해 사용한다. UserService에는 
회원정보 추가, 수정, 삭제 등의 메서드가 있다.  
  
# **User 모듈 생성하기**  
1. 다음 명령을 차례대로 입력하면 nest-cli가 자동으로 기본 코드를 만들어준다.  
nest g module user  
nest g controller user --no-spec  
nest g service user --no-spec  
  
이렇게 하면 src 디렉터리 아래에 user 디렉터리가 생기고 user 디렉터리는 명령어로 생성한 module, controller, service 파일이 있다. 유저 정보를 
저장하려면 리포지토리가 필요하다. 리포지토리는 생성하지 않고 ORM 라이브러리로 TypeORM 라이브러리에서 지원하는 Repository 클래스를 사용한다. 데이터베이스로 SQLite를 
사용한다.  
  

