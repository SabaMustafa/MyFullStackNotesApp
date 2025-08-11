pipeline {
  agent any
  options {
    timestamps()
    disableConcurrentBuilds()
  }

  stages {

    stage('Backend: Setup') {
      steps {
        dir('notes_project') {
          // Triple single-quotes avoid escaping backslashes
          bat '''
          if not exist venv (
            python -m venv venv
          )
          call venv\Scripts\activate
          venv\Scripts\python.exe -m pip install --upgrade pip
          if exist requirements.txt (
            venv\Scripts\python.exe -m pip install -r requirements.txt
          ) else (
            echo No requirements.txt found. Skipping pip install.
          )
          '''
        }
      }
    }

    stage('Backend: Tests') {
      steps {
        dir('notes_project') {
          bat '''
          call venv\Scripts\activate
          python manage.py test --noinput
          '''
        }
      }
    }

    stage('Frontend: Install') {
      steps {
        dir('notes-frontend') {
          bat '''
          npm install
          '''
        }
      }
    }

    stage('Frontend: Build') {
      steps {
        dir('notes-frontend') {
          bat '''
          npm run build
          '''
        }
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline finished successfully.'
      archiveArtifacts artifacts: 'notes-frontend/build/**', fingerprint: true, onlyIfSuccessful: true
    }
    failure {
      echo '❌ Pipeline failed. Check stage logs.'
    }
    always {
      echo "Build URL: ${env.BUILD_URL}"
    }
  }
}
