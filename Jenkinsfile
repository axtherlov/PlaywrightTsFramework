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
  }
  stages {
    stage('Install dependencies') {
      steps {
        bat '''
          npm install
          npx playwright install
        '''
      }
    }
    stage('Run Playwright tests (Docker)') {
      steps {
        bat '''          
            set TEST_USER_NAME=%TEST_CREDS_USR%
            set TEST_PASSWORD=%TEST_CREDS_PSW%            
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
