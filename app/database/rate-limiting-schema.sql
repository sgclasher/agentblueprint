-- rate_limit_requests table
CREATE TABLE IF NOT EXISTS rate_limit_requests (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  identifier TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rate_limit_requests_identifier_created_at ON rate_limit_requests(identifier, created_at);

-- Function to clean up old requests
CREATE OR REPLACE FUNCTION delete_old_rate_limit_requests()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM rate_limit_requests WHERE created_at < NOW() - INTERVAL '1 day';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run the cleanup function
CREATE TRIGGER trigger_delete_old_rate_limit_requests
AFTER INSERT ON rate_limit_requests
EXECUTE FUNCTION delete_old_rate_limit_requests();
