pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.58.0-noble'
      args '--ipc=host'
    }
  }

  options {
    timeout(time: 20, unit: 'MINUTES')
  }

  // Jenkins credentials → TEST_CREDS_USR / TEST_CREDS_PSW
  environment {
    TEST_CREDS = credentials('test-user')
  }

  stages {

    stage('Install dependencies') {
      steps {
        sh '''
          set -eu
          node -v
          npm -v
          npm ci
        '''
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh '''
          export TEST_USER_NAME="$TEST_CREDS_USR"
          export TEST_PASSWORD="$TEST_CREDS_PSW"
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
