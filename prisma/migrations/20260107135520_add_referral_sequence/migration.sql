-- 1. Ensure the sequence starts where you want
CREATE SEQUENCE IF NOT EXISTS user_referral_seq START 10001;

-- 2. Update the function to handle camelCase "referralCode" and empty strings
CREATE OR REPLACE FUNCTION set_referral_code()
RETURNS TRIGGER AS $$
BEGIN
    -- Better Auth/Prisma might send NULL or an empty string ""
    IF NEW."referralCode" IS NULL OR NEW."referralCode" = '' THEN
        NEW."referralCode" := 'U' || nextval('user_referral_seq');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Attach the trigger to the "user" table (mapped from User model)
DROP TRIGGER IF EXISTS trg_set_referral_code ON "user";
CREATE TRIGGER trg_set_referral_code
BEFORE INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION set_referral_code();