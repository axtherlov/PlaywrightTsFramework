pipeline {
  agent any
  tools {
    allure 'allure'
  }
  options {
    timeout(time: 20, unit: 'MINUTES')
  }
  environment {
    TEST_CREDS = credentials('test-user')
    PLAYWRIGHT_IMAGE = 'mcr.microsoft.com/playwright:v1.42.0-jammy'
  }
  stages {
    stage('Install dependencies') {
      steps {
        bat '''
          npm ci
        '''
      }
    }
    stage('Run Playwright tests (Docker)') {
      steps {
        bat '''
          docker run --rm ^
            -v "%WORKSPACE%:/tests" ^
            -w /tests ^
            -e TEST_USER_NAME=%TEST_CREDS_USR% ^
            -e TEST_PASSWORD=%TEST_CREDS_PSW% ^
            %PLAYWRIGHT_IMAGE% ^
            npm run demo
        '''
      }
      post {
        always {
          allure includeProperties: false,
                 jdk: '',
                 results: [[path: 'allure-results']],
                 reportBuildPolicy: 'ALWAYS'
        }
      }
    }
  }
}
